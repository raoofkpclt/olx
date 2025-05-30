import {AppRoutes} from './routes/AppRoutes'
import {BrowserRouter} from "react-router-dom"
import {UserContextProvider} from "./context/UserContext"
import {ViewContextProvider} from "./context/ViewContext"
import {SearchContextProvider} from "./context/SearchContext"

function App() {

  return (
    <UserContextProvider>
      <ViewContextProvider>
        <SearchContextProvider>
          <BrowserRouter>
            <AppRoutes/>
          </BrowserRouter>
        </SearchContextProvider>
      </ViewContextProvider>
    </UserContextProvider>
  )
}

export default App
