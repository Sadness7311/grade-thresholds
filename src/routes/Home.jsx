import Boards from "../components/Boards";
import Container from "../components/Container";
import boards from "../../boards.json";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    document.title = "Grade Thresholds";
  }, []);

  return (
    <Container className="text-center gap-5 mt-25">
      <h1>Grade Boundaries</h1>
      <p className="max-w-2xl mx-2">
        Grade boundaries for all exam boards! Useful to look up grade thresholds
        quickly for any year. If you find this useful, donate to us!
      </p>
      <Boards boards={boards} />
    </Container>
  );
}

export default Home;
