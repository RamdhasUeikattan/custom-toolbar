import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemModel } from '@syncfusion/ej2-navigations';
import { gridData1 } from './data';
import {ToolbarItems} from '@syncfusion/ej2-ng-grids';

@Component({
    selector: 'my-app',
    template: `<ej-grid #grid [dataSource]='data' [allowFiltering]='true' height='350px' [editSettings]='editSetting' 
    (dataBound)='dataBoundHandler()' [toolbar]='toolbarItems'>
                <e-columns>
                    <e-column field='OrderID' isPrimaryKey='true' headerText='Order ID' textAlign='right' width=120></e-column>
                    <e-column field='CustomerID' headerText='Customer ID' width=150 [validationRules]='validationRules'></e-column>
                    <e-column field='ShipCity' headerText='Ship City' width=150></e-column>
                    <e-column field='ShipName' headerText='Ship Name' width=150></e-column>
                </e-columns>
                </ej-grid>

                <ng-template #template>
                  <span>DataCount - {{dataCount}}</span>
                </ng-template>`
})
export class AppComponent implements OnInit {

    public data: Object[];

    @ViewChild('grid')
    public grid;
    @ViewChild('template')
    public rowCount;
    public editSetting: Object;
    public validationRules;
    public toolbarItems: (ToolbarItems | ItemModel)[];

    public dataCount;

    ngOnInit(): void {
        this.data = gridData1;
        this.toolbarItems = ['add', 'delete', 'cancel', 'update', 'edit', {template: this.rowCount}]
        this.validationRules= {required:true};
        this.editSetting= {allowEditing: true, allowDeleting: true, allowAdding: true};
    }
    dataBoundHandler() {
      // update data count
      this.dataCount = this.grid.currentViewData.length;
    }
}
