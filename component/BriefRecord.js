import { SQLiteProvider } from 'expo-sqlite';
import BriefRecordList from './BriefRecordList';

export default function BriefRecord() {
    const initialize = async (db) => {
      db.execAsync(`
        CREATE TABLE IF NOT EXISTS briefRecord (id INT, date TEXT, shop TEXT);
        CREATE TABLE IF NOT EXISTS detailRecord (id INT, item TEXT, amount INT, price NUM, category TEXT, promotion Boolean);
      `);
    };
  
    return (
      <SQLiteProvider
        databaseName='briefRecorddb.db'
        onInit={initialize}
        onError={error => console.error('Could not open database', error)}
      >
        <BriefRecordList />
      </SQLiteProvider>
    );
  }