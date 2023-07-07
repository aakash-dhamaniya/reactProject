import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function Check() {
  const [data, setData] = useState();
  const sent = useSelector((state) => state.mails.sent);

  const res = sent.find((element) => element.id === "-NZMBRJMG9YJcHDD3Uz3");

  setData(res);

  console.log(data);
  return (
    <div>
      {data && data.id}
      {data && data.to}
    </div>
  );
}

export default Check;
