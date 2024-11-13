import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import Products from '../pages/Products';
import Reports from '../pages/Reports';
import Warehouse from '../pages/Warehouse';
import Accounts from '../pages/Accounts';
import Provider from '../pages/Provider';
import ExportOrders from '../pages/ExportOrders';
import ProductEntry from '../pages/ProductEntry';

const Routes = () => {
    return (
        <Switch>
            {/* Hiển thị các trang sau khi đăng nhập */}
            <Route path="/productentry" component={ProductEntry} />
            <Route path="/accounts" component={Accounts} />
            <Route path="/customers" component={Customers} />
            <Route path="/products" component={Products} />
            <Route path="/reports" component={Reports} />
            <Route path="/warehouse" component={Warehouse} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/provider" component={Provider} />
            <Route path="/exportorders" component={ExportOrders} />

            {/* Chuyển hướng mặc định về dashboard khi đã đăng nhập */}
            <Redirect to="/dashboard" />
        </Switch>
    );
};

export default Routes;
