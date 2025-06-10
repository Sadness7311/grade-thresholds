import { useEffect } from "react";
import Container from "../components/Container";

function Api() {
  useEffect(() => {
    document.title = "Coming soon...";
  }, []);

  return (
    <Container className="mt-5">
      <h2>Coming soon...</h2>
    </Container>
  );
}

export default Api;
