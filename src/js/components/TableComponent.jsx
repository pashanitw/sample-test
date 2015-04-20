var React = require('react');
var EditorActionCreator=require('../actions/EditorActionCreator.js');
var Column = React.createClass({
  componentWillMount() {

  },
  render() {
    return (<td>
      <div ref="data"
        contentEditable="true"
        dangerouslySetInnerHTML={{__html: this.props.column.markup}}
        onDoubleClick={this.enableEditor}
        onBlur={this.disableEditor}>
      </div>
    </td>)
  },
  enableEditor() {
    var node = this.refs.data.getDOMNode();
    CKEDITOR.inline(node);
  },
  disableEditor(evt) {
    this._destroyCk();
    var html = $(evt.target).html();
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
      return <tr>
     {
       row.map(function (column, columnIndex) {
         return <Column column={column}
           rowIndex={rowIndex}
           columnIndex={columnIndex}
           index={that.props.index}>
         </Column>
       })
       }
      </tr>
    });
  },
  render: function () {
    return (
      <div className={"table-component"}>
        <table cellspacing='0'>
          <tr className="head">
            <th>day</th>
            <th>topic</th>
            <th>tasks</th>
            <th>activities</th>
            <th>more to do</th>
            <th>teaching periods(s)</th>
            <th>resources</th>
          </tr>
      {
        this.getRows()
        }

        </table>
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

