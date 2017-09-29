// import { Component, OnInit, ViewChild } from '@angular/core';
// import { gridData1, employeeData } from './data';
// import { Grid } from '@syncfusion/ej2-grids';
// import { PageService } from '@syncfusion/ej2-ng-grids';

// @Component({
//     selector: 'my-app',
//     template: `<button ej-button (click)='onchange()'> Change Data</button> 
//     <ej-grid #grid [dataSource]='data' [allowPaging]='allowPage' [columns]='columns' [pageSettings]='pageSettings'>
//     </ej-grid>`,
//     providers: [PageService]
// })

// export class AppComponent implements OnInit {

//     @ViewChild('grid')
//     public grid: Grid;
//     public data: Object[];
//     public pageSettings: Object;
//     public columns;
//     public allowPage;

//     public ngOnInit(): void {
//         this.data = gridData1;
//         this.pageSettings = { pageCount: 5 };
//         this.allowPage = true;
//         this.columns =  [
//             { field: 'OrderID', headerText: 'Order ID', textAlign: 'right', width: 140 },
//             { field: 'CustomerID', headerText: 'Customer ID', width:150 },
//             { field: 'ShipName', headerText: 'Ship Name', width: 100 },
//             { field: 'ShipAddress', headerText: 'Ship Address',width: 150 }
//         ];
//     }

//     onchange(){
//         if(this.grid.dataSource === employeeData ){
//             this.data = gridData1; // dynamically changing datasource.
//             this.columns = [
//                 { field: 'OrderID', headerText: 'Order ID', textAlign: 'right', width: 140 },
//                 { field: 'CustomerID', headerText: 'Customer ID', width:150 },
//                 { field: 'ShipName', headerText: 'Ship Name', width: 100 },
//                 { field: 'ShipAddress', headerText: 'Ship Address',width: 150 },
//             ];
//             // this.grid.dataBind();
//             // prepareColumns(this.grid.columns); // prepare new column object
//             // this.grid.refresh(); // refresh the grid.
//         } else {
//             this.data = employeeData; // dynamically changing datasource.
//             this.columns = [{ field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'right', width: 125 },
//             { field: 'FirstName', headerText: 'Name', width: 120 },
//             { field: 'Title', headerText: 'Title', width: 170 }];
//             // this.grid.dataBind();
//             // prepareColumns(this.grid.columns); // prepare new column object
//             // this.grid.refresh(); // refresh the grid.

            
//         }
//     }
// }
// // import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
// // import { employeeData, gridData1 } from './data';
// // import { DetailRowService } from '@syncfusion/ej2-ng-grids';

// // @Component({
// //     selector: 'my-app',
// //     template: `<ej-grid #Grid id='Grid' [dataSource]='parentData' [childGrid]='childGrid'>
//     // <e-columns>
//     //     <e-column field='EmployeeID' headerText='Employee ID' width='120' textAlign="right">
//     //     <ng-template #template>
//     //     <img src='dsjd' alt='1'/>
//     //     </ng-template></e-column>
//     //     <e-column field='FirstName' headerText='Name' width='140'></e-column>
//     //     <e-column field='Title' headerText='Title' width='170'></e-column>
//     //     <e-column field='HireDate' headerText='Hired Date' width='120' format='yMd' textAlign="right"></e-column>
//         //  <e-column field='ReportsTo' headerText='Reports To' width='120' ></e-column>
//     // </e-columns>
// // </ej-grid>
// // `,
// // providers: [DetailRowService]

// // })
// // export class HierarchyComponent implements OnInit {
// //     public parentData: Object[];
// //     public childGrid: any;
// //     public secondChildGrid: any;
// //     @ViewChild('temp')
// //     public temp;
// //     @ViewChild('Grid')
// //     public grid;


// //     ngOnInit(): void {
// //         this.parentData = employeeData;
// //         this.childGrid = {
// //             dataSource: gridData1,
// //             queryString: 'EmployeeID',
// //             allowPaging: true,
// //             pageSettings: {pageSize: 6, pageCount: 5},
// //             columns: [
// //                 { field: 'OrderID', headerText: 'Order ID', textAlign: 'right', width: 120 },
// //                 { field: 'ShipCity', headerText: 'Ship City', width: 120 },
// //                 { field: 'Freight', headerText: 'Freight', width: 120 },
// //                 { field: 'ShipName', headerText: 'Ship Name', width: 150 },
// //                 { headerText: 'Data', textAlign: 'left', width: 100, template: this.temp },
// //                 //{ headerText: 'Data', textAlign: 'left', width: 100, template: `<button class="e-flat e-btn e-control" onclick="clicked()">Req</button>` },
// //             ]
// //         };
         
// //     }
// //     clicked = () => {
// //         debugger; // write your custom code here
// //     }
// // }

// // (<any>window).clicked = () => {
// //     debugger; // write your custom code here
// // }

import { Component, OnInit, ViewChild } from '@angular/core';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { gridData1 } from './data';

@Component({
    selector: 'my-app',
    template: `<ej-grid #grid [dataSource]='data' height='350px' [editSettings]='editSetting' (actionComplete)='actionCompleteHandler($event)' (actionBegin)='actionBeginHandler($event)' 
    (dataBound)='dataBoundHandler()'>
                <ng-template #toolbarTemplate let-data>
                 <ej-toolbar #toolbar (clicked)='toolbarClick($event)'>
                  <e-items>
                     <e-item text='Add' prefixIcon='e-add' id='add'></e-item>
                     <e-item text='Edit' prefixIcon='e-edit' id='edit'></e-item>
                     <e-item text='Delete' prefixIcon='e-delete' id='delete'></e-item>
                     <e-item text='Update' prefixIcon='e-update' id='update'></e-item>
                     <e-item text='Cancel' prefixIcon='e-cancel' id='cancel'></e-item>
                  </e-items>
                </ej-toolbar> 
                </ng-template>
                <e-columns>
                    <e-column field='OrderID' isPrimaryKey='true' headerText='Order ID' textAlign='right' width=120></e-column>
                    <e-column field='CustomerID' headerText='Customer ID' width=150 [validationRules]='validationRules'></e-column>
                    <e-column field='ShipCity' headerText='Ship City' width=150></e-column>
                    <e-column field='ShipName' headerText='Ship Name' width=150></e-column>
                </e-columns>
                </ej-grid>`
})
export class AppComponent implements OnInit {

    public data: Object[];

    @ViewChild('grid')
    public grid;
    
    @ViewChild('toolbar')
    public toolbar;
    
    public editSetting: Object;
    public validationRules;
    
    public toolbarItems;

    ngOnInit(): void {
        this.data = gridData1;
        this.validationRules= {required:true};
        this.editSetting= {allowEditing: true, allowDeleting: true, allowAdding: true};
    }
    
    toolbarClick(args: ClickEventArgs){
      debugger;
      switch(args.item.id){
        case 'add':
          this.grid.editModule.addRecord();
          break;
        case 'edit':
          this.grid.editModule.startEdit();
          break;
        case 'delete':
          this.grid.editModule.deleteRecord();
          break;
        case 'update':
          this.grid.editModule.endEdit();
          break;
        case 'cancel': 
          this.grid.editModule.closeEdit();
          break;
      }
    }
    
    dataBoundHandler(){
      var nodeList = this.toolbar.element.querySelectorAll('.e-toolbar-item');
      this.toolbarItems = Array.from(nodeList);
      // For initial rendering toolbar items show hidden
      this.toolbar.enableItems(this.toolbarItems.slice(3,5), false);
      this.toolbar.enableItems(this.toolbarItems.slice(0,3), true);
    }
    actionCompleteHandler(args){
      if(args.requestType === 'cancel' || args.requestType==='save') {
        this.toolbar.enableItems(this.toolbarItems.slice(3,5), false);
        this.toolbar.enableItems(this.toolbarItems.slice(0,3), true);
      }
    }
    
    actionBeginHandler(args){
      if(args.requestType === 'beginEdit' || args.requestType==='add') {
        this.toolbar.enableItems(this.toolbarItems.slice(3,5), true);
        this.toolbar.enableItems(this.toolbarItems.slice(0,3), false);
      } 
    }
    
}