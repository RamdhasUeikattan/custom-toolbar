import { Component, OnInit, ViewChild } from '@angular/core';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { gridData1 } from './data';

@Component({
    selector: 'my-app',
    template: `<ej-grid #grid [dataSource]='data' [allowFiltering]='true' height='350px' [editSettings]='editSetting' (actionComplete)='actionCompleteHandler($event)' (actionBegin)='actionBeginHandler($event)' 
    (dataBound)='dataBoundHandler()'>
                <ng-template #toolbarTemplate let-data>
                 <ej-toolbar #toolbar (clicked)='toolbarClick($event)'>
                  <e-items>
                     <e-item text='Add' prefixIcon='e-add' id='add'></e-item>
                     <e-item text='Edit' prefixIcon='e-edit' id='edit'></e-item>
                     <e-item text='Delete' prefixIcon='e-delete' id='delete'></e-item>
                     <e-item text='Update' prefixIcon='e-update' id='update'></e-item>
                     <e-item text='Cancel' prefixIcon='e-cancel' id='cancel'></e-item>
                     <e-item >
                     <ng-template #template>
                        <span>DataCount - {{dataCount}}</span>
                     </ng-template>
                     </e-item>
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

    public dataCount;

    ngOnInit(): void {
        this.data = gridData1;
        this.validationRules= {required:true};
        this.editSetting= {allowEditing: true, allowDeleting: true, allowAdding: true};
    }
    
    toolbarClick(args: ClickEventArgs){
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

      // update data count
      this.dataCount = this.grid.currentViewData.length;
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
