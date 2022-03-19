import { CssBaseline } from '@mui/material';
import Junction from "../src/pages/junction"
import Palette from "../src/pages/palette"
import customTheme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import AuthContextComponent from "./contexts/authContext";

// to activate
import { a } from "./firebase/fakeData/fakeData";

function App() {
  return (
      <CssBaseline>
        <ThemeProvider theme={ customTheme }>
          <AuthContextComponent> 
            {/* <Palette/>  works */}

            {/* junction contains route */}
            <Junction/> 
          </AuthContextComponent>
        </ThemeProvider>
      </CssBaseline> 
  );
}

export default App;
