import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, Subject } from 'rxjs';
import { CrudServiceService } from 'src/app/services/crud-service.service';
import { MatTableItem } from '../model/MatTableItem';

/**
 * Data source for the MatTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */

export class MatTableDataSource extends DataSource<MatTableItem> {
  data: MatTableItem[];  
  _filterChange = new Subject();
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private paginator: MatPaginator, private sort: MatSort, private crudService: CrudServiceService) {
    super();
    this.crudService.getLogRecord()
    .subscribe(logData=>{
          this.data = <MatTableItem[]>logData;
    });
    if(this.sort!= undefined){
      this.sort.active = 'date';
      this.sort.direction = 'desc';
    }
    this._filterChange.subscribe();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */

  connect(collectionViewer: CollectionViewer): Observable<MatTableItem[]> {   
    const dataMutations = [
      observableOf(...this.data),
      this._filterChange,
      this.paginator.page,
      this.sort.sortChange
    ];
    return merge(...dataMutations).pipe(map(() => {
      let mergedData = this.getFilteredData(this.getPagedData(this.getSortedData([...this.data])));
      return mergedData;
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(collectionViewer: CollectionViewer) {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: MatTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MatTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id': return compare(a.name, b.name, isAsc);
        case 'date': return compare(a.dateTime, b.dateTime, isAsc);
        case 'status': return compare(+a.status, +b.status, isAsc);
        case 'user': return compare(+a.user, +b.user, isAsc);
        case 'userSystem': return compare(+a.userSystem, +b.userSystem, isAsc);
        default: return 0;
      }
    });
  }

  private getFilteredData(data: MatTableItem[]){
    return data.slice().filter((item :MatTableItem)=>{
        const searchStr = item["id"];
        return searchStr==undefined?"false" : searchStr.indexOf("search".toLowerCase()) !== -1;
      })
  }

  filteredData: MatTableItem[] = [];
  renderedData: MatTableItem[] = [];
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
