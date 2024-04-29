import React, {  useContext } from "react";
import { Table, Card, CardBody } from "reactstrap";
import { ListContext } from "../context/listContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { list } = useContext(ListContext);

 const navigate = useNavigate()

  return (
    <div>
      <h2 className="App-header mb-3">Inventory List</h2>
      <div className="d-flex justify-content-center">
        <Card className="w-50">
          <CardBody>
            <Table className="">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {list
                  ?.filter((item) => !item.isDeleted)
                  .map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <th scope="row"> {index + 1} </th>
                        <td> {item.itemName} </td>
                        <td> {item.quantity} </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            <button className="btn btn-primary" onClick={() => navigate("/lists") }  >Edit List</button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export { Home };
