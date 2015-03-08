var React = require('react');


var CanvasEditor = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {

  },

  render: function() {
    return (
      <div className="container editor-view">
        <div className="header">
          <div className="headerLeft">
            <h2 className="sampleTitle" contentEditable="true">
              CKEditor<br/> Goes Inline!
            </h2>

            <h3 contentEditable="true">
              Lorem ipsum dolor sit amet dolor duis blandit vestibulum faucibus a, tortor.
            </h3>
          </div>
          <div className="headerRight">
            <div contentEditable="true">
              <p>
                Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas
                malesuada elit lectus felis, malesuada ultricies.
              </p>

              <p>
                Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac,
                laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna.
                Vestibulum dapibus, mauris nec malesuada fames ac.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CanvasEditor;
