import { Button } from "reactstrap";
import { useContext } from "react";
import { ThemeContext } from "../App";

function TestPage() {
    const themeContext = useContext(ThemeContext);
    return (
      <div>
        <Button
          color='primary'
          onClick={() =>
            themeContext.theme == "light"
              ? themeContext.setTheme("dark")
              : themeContext.setTheme("light")
          }
        >
          {themeContext.theme}
        </Button>
      </div>
    );
}

export default TestPage;
