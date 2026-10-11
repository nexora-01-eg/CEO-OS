import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { Dashboard } from "./pages/Dashboard";
import { ComingSoon } from "./pages/ComingSoon";
import { seedIfEmpty } from "./lib/seed";
import { Layers, TrendingUp, BarChart3, Settings } from "lucide-react";

export default function App() {
  useEffect(() => {
    seedIfEmpty();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/content-factory"
            element={
              <ComingSoon
                title="Content Factory"
                icon={Layers}
                note="The full production system — lifecycle board, monthly calendar and content cards — is being built in the next phase."
              />
            }
          />
          <Route
            path="/sales"
            element={<ComingSoon title="Sales" icon={TrendingUp} note="Pipeline and sales tracking arrives in a later version." />}
          />
          <Route
            path="/analytics"
            element={<ComingSoon title="Analytics" icon={BarChart3} note="Performance analytics arrives in a later version." />}
          />
          <Route
            path="/settings"
            element={<ComingSoon title="Settings" icon={Settings} note="App preferences and data management arrive in a later version." />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
