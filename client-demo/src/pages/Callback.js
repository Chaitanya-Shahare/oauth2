import { handleCallback } from "@chaitanya-shahare/oauth2/lib/es6";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { client } from "../App";
export default function Callback() {
  let [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      return <h1>Invalid code</h1>;
    }

    handleCallback(client, { code })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Callback</h1>
    </div>
  );
}
