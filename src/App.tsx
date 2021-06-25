import React, { FC } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import FillTableSizeForm from './modules/fill-table-form/fill-table';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { PreferenceTablePage } from './pages/PreferenceTablePage';
import { RankingPage } from './pages/RankingPage';

const App: FC = () => {
   return (
      <div>
         <HashRouter basename={process.env.PUBLIC_URL}>
            <Switch>
               <Route exact path="/" component={FillTableSizeForm} />
               <Route exact path="/preference" component={PreferenceTablePage} />
               <Route exact path="/ranking" component={RankingPage} />
            </Switch>
         </HashRouter>
      </div>
   );
}

export default App;
