import React from 'react'
class ContentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ' <p>Paragraph</p>'
    };
  }

  handleContentChange = (event) => {
    this.setState({
      content: event.target.value
    });
  }

  handleSave = () => {
    // Save the content to some storage, such as a database or a file
  }

  render() {
    return (
      <div>
        <textarea value={this.state.content} onChange={this.handleContentChange} />
        <button onClick={this.handleSave}>Save</button>
        
      </div>
    );
  }
}
export default ContentComponent;