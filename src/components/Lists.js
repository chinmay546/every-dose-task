import React, { useContext, useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Table,
  InputGroup,
  Label,
  FormGroup,
} from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import { ListContext } from "../context/listContext";
import crossIcon from "../images/glyph_x.svg";
import upArrow from "../images/chevron_up_small.svg";
import downArrow from "../images/chevron_down_small.svg";
import refresh from "../images/refresh.svg";

const Lists = () => {
  const { list, updateStorage } = useContext(ListContext);
  const [showDeleted, setShowDeleted] = useState(false);

  const addItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newItem = { isDeleted: false, id: uuidv4() };
    for (const [key, value] of formData.entries()) {
      newItem[key] = key === "quantity" ? parseInt(value) : value;
    }

    const updatedData = [...list, newItem];
    updateStorage(updatedData);

    e.target.reset();
  };

  const updateQty = (id, qty ,flag ) => {
    if ( flag ) return
    if (qty === 0) {
      alert("Quantity can't be less then 1");
      return;
    }
    const updatedData = list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: qty,
        };
      }
      return item;
    });

    updateStorage(updatedData);
  };

  const changeStatus = (itemId) => {
    const updatedData = list.map((data) =>
      data.id === itemId ? { ...data, isDeleted: !data.isDeleted } : data
    );

    updateStorage(updatedData);
  };

  return (
    <div>
      <h2 className="App-header">Edit List</h2>
      <div className="d-flex justify-content-center">
        <Card className="w-50">
          <CardBody>
            <form
              id="addItemForm"
              className="addItem"
              onSubmit={(e) => addItem(e)}
            >
              <div>
                <Label> Item Name * </Label>
                <Input name="itemName" />
              </div>

              <div>
                <Label> Quantity * </Label>
                <InputGroup>
                  <Input name="quantity" type="number" />
                  <button
                    name="submitForm"
                    className="btn btn-primary"
                    type="submit"
                  >
                    Add
                  </button>
                </InputGroup>
              </div>
            </form>

            <Table className="">
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {list.map(
                  (item) =>
                    (showDeleted || !item.isDeleted) && (
                      <tr
                        className={item.isDeleted ? "deleted" : ""}
                        key={item.id}
                      >
                        <td> {item.itemName} </td>
                        <td>
                          <div className="quantity-wrapper">
                            Quantity : {item.quantity}
                            <div className="arrow-img-wrapper">
                              <img
                                alt="up-arrow"
                                src={upArrow}
                                onClick={() =>
                                  updateQty(item.id, item.quantity + 1 , item.isDeleted)
                                }
                                className={item.isDeleted ? "deleted" : ""}
                              />
                              <img
                                alt="down-arrow"
                                src={downArrow}
                                onClick={() =>
                                  updateQty(item.id, item.quantity - 1 , item.isDeleted)
                                }
                                className={item.isDeleted ? "deleted" : ""}
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <img
                            src={item.isDeleted ? refresh : crossIcon}
                            alt="icon"
                            onClick={() => changeStatus(item.id)}
                          />
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </Table>

            <section className="action-btns">
              <div className="toggle-wrapper"  >
                <FormGroup switch>
                  <Input
                    type="switch"
                    role="switch"
                    checked={showDeleted}
                    onClick={(e) => setShowDeleted(!showDeleted)}
                  />
                </FormGroup>
                <Label> View Deleted </Label>
              </div>

              <button
                className="btn btn-clear"
                onClick={() => updateStorage([])}
              >
                Clear All
              </button>
            </section>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export { Lists };
