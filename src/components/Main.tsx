import "./Main.css";
import { Input } from "@/components/Input";
import { Output } from "@/components/Output";

const Main = () => {
  return (
    <div className="container">
      <div className="grid">
        <div className="row">
          <Output />
        </div>
        <div className="row">
          <Input />
        </div>
        <footer className="footer has-background-dark has-text-success mt-5">
          <div className="content has-text-right">
            <p>
              <strong className="has-text-success"> Powered by </strong>
              <a href="https://sunrisesunset.io">SunriseSunset.io</a> and
              <a href="https://positionstack.com/"> positionstack</a>.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export { Main };
