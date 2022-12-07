import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import AllProducts from './AllProducts/AllProducts';
import AllUsers from './AllUsers/AllUsers';
import AllCategories from './AllCategories/AllCategories';
import Statistics from './Statistics/Statistics';
import MainContent from './MainContent/MainContent';
import './RouterApp.css';

import Error404 from './Error404';
function RouterApp() {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <div className='content-wrapper'>
                    <Routes>
                        <Route
                            path={'/allProducts'}
                            element={<AllProducts />}
                        />
                        <Route path={'/allUsers'} element={<AllUsers />} />
                        <Route
                            path={'/allCategories'}
                            element={<AllCategories />}
                        />
                        {/* <Route path={"/createProduct"} element={<CreateForm/>}/>
                     <Route path={"/editProduct"} element={<EditForm/>}/>
                    <Route path={"/deleteProduct"} element={<DeleteForm/>}/> */}
                        <Route path={'/statistics'} element={<Statistics />} />
                        <Route exact path={'/'} element={<MainContent />} />
                        <Route path={'*'} element={<Error404 />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}
export default RouterApp;
