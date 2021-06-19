import React, { FC } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import FillTableSizeForm from './modules/fill-table-form/fill-table';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PreferenceTable from './modules/preference-table/preference-table';
import Ranking from "./modules/ranking/ranking"
import { PreferenceTablePage } from './pages/PreferenceTablePage';
import { RankingPage } from './pages/RankingPage';

const App: FC = () => {

   return (
      <div>
         <BrowserRouter>
            <Switch>
               <Route exact path="/" component={FillTableSizeForm} />
               <Route exact path="/preference" component={PreferenceTablePage} />
               <Route exact path="/ranking" component={RankingPage} />
            </Switch>
         </BrowserRouter>

      </div>
   );
}

export default App;
