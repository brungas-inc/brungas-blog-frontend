import React, {useState, useEffect} from 'react';
import './App.css';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom'
import component from "./components";
import pages from "./pages";
import { fetchAllLikes, fetchAllPosts, getUserInfo } from './app/api';
import { useSelector, useDispatch}  from 'react-redux'
import { saveUser, selectUserData, apiConfigurations } from './slices/userSlice'

const App = () => {
    const user = useSelector(selectUserData)
    const config = useSelector(apiConfigurations)
    const dispatch = useDispatch()
    const history = useHistory();
    // const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [likes, setLikes] = useState([])

    const getAllPosts = async () => {
        try {
            const response = await fetchAllPosts()
            const sortedPosts = response.slice().sort((a, b) => b.date_updated.localeCompare(a.date_updated))
            // dispatch(fetchPosts(sortedPosts))
            setPosts(sortedPosts)
            } catch (error) {
            console.log('Getting All Posts ', error.response.data )
        }
    }

    const getAllLikes = async () => {
        try {
            const response = await fetchAllLikes()
            setLikes(response)
            } catch (error) {
            console.log('Getting All Likes ', error.response.data )
        }
    }


    const getUserProfileInfo = async () => {
        const config = {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('acc')}` }
        }

        try {
            const profile = await getUserInfo(config)
            dispatch(saveUser({
              acc: localStorage.getItem('acc'),
              ref: localStorage.getItem('ref'),
              isAuthenticated: true,
              userId: profile.id,
              first_name: profile.first_name,
              last_name: profile.last_name,
              username: profile.username,
              email: profile.email,
              date_joined: profile.date_joined
            }))
            
        } catch (error) {
            console.log('Getting User Profile ', error.response.data)
        }
    }

    useEffect(() => {
        getUserProfileInfo();
        getAllPosts();
        getAllLikes();
    }, [])


  return (
      <React.Fragment>
          <div style={{padding: "0px", background: "#f2f2f2"}} className="container-fluid">
              <component.Header />
          </div>
          <div className="container pt-3 bg-light">
              <div className="row">
                  <div className="col col-sm-12 col-lg-12 col-md-12">
                      <Switch>
                          <Route path="/home" exact component={() => <component.Content posts={posts} likes={likes} pullLikes={getAllLikes} />} />
                          <Route path="/login" component={() => <pages.Login />} />
                          <Route path="/about" component={() => <pages.About />} />
                          <Route path="/profile" component={() => <pages.Profile />} />
                          <Route path="/register" component={() => <pages.Register />} />
                          <Route path="/blog/:id" exact component={() => <pages.BlogDetails />} />
                          <Route path="/not-found" exact component={() => <pages.NotFound />} />
                          <Redirect from="/" exact to="/home" />
                          <Redirect to="/not-found" />
                      </Switch>
                  </div>
              </div>
          </div>
      </React.Fragment>
  );
}

export default App;
