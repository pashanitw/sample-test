var React = require('react');
var EditorActionCreator=require('../actions/EditorActionCreator.js');
var FloatButton=require('../components/FloatButton.jsx');
var Column = React.createClass({
  componentWillMount() {

  },
  render() {
    return (<td>
      <div ref="data"
        contentEditable="true"
        dangerouslySetInnerHTML={{__html: this.props.column.markup}}
        onDoubleClick={this.enableEditor}>
      </div>
    </td>)
  },
  enableEditor() {
    var element = this.refs.data.getDOMNode();

    var editor= CKEDITOR.inline(element, {
      allowedContent: true
    });
    $(element).focus();
    var that=this;
    editor.on('blur', function(event) {
      // Do something, Example: disable toolbar:

      editor.focusManager.blur();
      that._destroyCk();
      that.disableEditor(editor.getData());
    });
  },
  addRow(){

  },
  deleteRow(){

  },
  disableEditor(html) {
    const {index,rowIndex,columnIndex}=this.props;
    EditorActionCreator.updateTableCell(index,rowIndex,columnIndex, html);
  },
  _destroyCk() {
    for (var name in CKEDITOR.instances) {
      CKEDITOR.instances[name].destroy()
    }
  },
  componentDidMount() {

  }
});

var TableComponent = React.createClass({
  getInitialState: function () {
    return {};
  },

  componentDidMount: function () {
  },
  getRows() {
    var that=this;
    return this.props.rows.map(function (row, rowIndex) {
      return <tr className={row.classes.join(' ')}>
     {
       row.data.map(function (column, columnIndex) {
         return <Column column={column}
           rowIndex={rowIndex}
           columnIndex={columnIndex}
           index={that.props.index}
         >
         </Column>
       })
       }
      </tr>
    });
  },
  addRow(){
    EditorActionCreator.addNewRowToTable(this.props.index,this.props.rows[0].data.length);
  },
  render: function () {
    var classes='mdi-content-add';
    return (
      <div>
        <table cellspacing='0'>
      {
        this.getRows()
        }

        </table>
        <FloatButton classes={classes} action={this.addRow}></FloatButton>
      </div>

    );
  },
  componentDidUpdate() {

  },
  configureCk(element) {
    CKEDITOR.inline(element, {
      allowedContent: true
    });
    $(element).focus();
  }
});

module.exports = TableComponent;

