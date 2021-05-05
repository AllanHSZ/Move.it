import { Spinner } from "./Spinner";

export const Redirecting = () => (
  <div className="page--fill page--center page--column">
    <Spinner/>
    <span>Redirecioando aguarde...</span>
  </div>
);