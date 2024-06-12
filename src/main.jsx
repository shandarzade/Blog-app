import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout, Login } from './components/index.js';
import AllPosts from './components/Pages/AllPost.jsx';
import AddPost from './components/Pages/AddPost.jsx';
import EditPost from './components/Pages/EditPost.jsx';
import Post from './components/Pages/Post.jsx';
import Signup from './components/Pages/Signup.jsx';
import Home from './components/Pages/Home.jsx'


  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <Home/>,
        },
        {
          path:'/login',
          element:(
            <AuthLayout authentication={false}>
              <Login/>
            </AuthLayout>
          )
        },
        {
          path:'/signup',
          element:(
            <AuthLayout authentication = {false}>
              <Signup/>
            </AuthLayout>
          )
        },
        {
          path:'/all-posts',
          element:(
            <AuthLayout authentication>
              {" "}
              <AllPosts />
            </AuthLayout>
          )
        },
        {
          path: "/add-post",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <AddPost />
              </AuthLayout>
          ),
      },
      {
          path: "/edit-post/:slug",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <EditPost />
              </AuthLayout>
          ),
      },
      {
          path: "/post/:slug",
          element: <Post />,
      },
      ]
    }
  ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    
  </React.StrictMode>,
)
