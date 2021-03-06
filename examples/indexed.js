
import 'rmc-list-view/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'rmc-list-view';
import MyScroller from './MyScroller';

const NUM_SECTIONS = 20;
const NUM_ROWS_PER_SECTION = 10;

const Demo = React.createClass({
  getInitialState() {
    const getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };
    const getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[rowID];
    };

    const dataSource = new ListView.DataSource({
      getRowData: getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    return {
      dataSource: dataSource.cloneWithRowsAndSections({}, [], []),
      headerPressCount: 0,
    };
  },
  componentDidMount() {
    // simulate ajax
    setTimeout(() => {
      const dataBlob = {};
      const sectionIDs = [];
      const rowIDs = [];
      for (let ii = 0; ii < NUM_SECTIONS; ii++) {
        const sectionName = String.fromCharCode(65 + ii);
        sectionIDs.push(sectionName);
        dataBlob[sectionName] = sectionName;
        rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
          const rowName = `S${ii}, R${jj}`;
          rowIDs[ii].push(rowName);
          dataBlob[rowName] = rowName;
        }
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      });
    }, 1000);
  },
  render() {
    return (<div style={{ margin: '10px auto', width: '80%', position: 'relative' }}>
      <ListView.IndexedList
        dataSource={this.state.dataSource}
        renderHeader={() => <span style={{ padding: 10 }}>header</span>}
        renderFooter={() => <span style={{ padding: 10 }}>footer</span>}
        renderSectionHeader={(sectionData) => (
          <div style={{ color: 'blue', padding: 10, backgroundColor: '#ddd' }}>
            {sectionData}
          </div>
        )}
        renderRow={(rowData) => (<div style={{ padding: 10 }}>Hello: {rowData}</div>) }
        renderScrollComponent={props => <MyScroller {...props}
          style={{ height: 500, overflow: 'auto' }} />}
        contentContainerStyle={{ textAlign: 'left' }}
        quickSearchBarStyle={{
          position: 'absolute',
          top: 20, right: 30
        }}
        onQuickSearch={(sectionID) => console.log(sectionID) }
        delayTime={100}
        delayActivityIndicator={
          <div style={{padding: 25, textAlign: 'center' }}>delay rendering...</div>
        }
      />
    </div>);
  },
});

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
