import React, { useState } from "react";
import { Row, Col, Slider, Typography, Switch,} from "antd";
import "./product.css";

const { Title } = Typography;

const attributeCosts = {
  texture: 5,
  renders: 10,
  configurator: 15,
  video: 25,
};
const newProductCosts = {
  silhouettes: 100,
  vignettes: 200,
  ar: 300,
  imagery: 400,
};

const SliderInput = ({
  unlimited,
  label,
  value,
  onChange,
  min = 0,
  max = 1000,
  showSwitch,
  switchChecked,
  onSwitchChange,
}) => (
  <div
    style={{
      backgroundColor: "#E8E8E8",
      borderRadius: "20px",
      width: "400px",
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      padding: "20px",
      gap: "10px",
      marginBottom: "10px",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
        {" "}
        <Col span={8}>
          <label style={{ fontWeight: "500", fontSize: "24px" }}>{label}</label>
        </Col>
        {!unlimited ? (
          <div
            style={{
              marginTop: "5px",
              alignItems: "center",
              marginRight: "5px",
              display: "flex",
              gap: "20px",
            }}
          >
            {" "}
            <div>Unlimited</div>{" "}
            <Switch
              size="small"
              // checked={switchChecked}

              // onChange={onSwitchChange}
            />
          </div>
        ) : null}
      </div>

      {showSwitch && (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Switch checked={switchChecked} onChange={onSwitchChange} />
        </div>
      )}
    </div>

    <Row>
      <Col span={24}>
        <div>No. of {label}</div>
        <Slider
          min={min}
          max={max}
          value={typeof value === "number" ? value : 0}
          onChange={onChange}

          // tooltip={{
          //   open: true,
          // }}
        />
      </Col>
    </Row>
  </div>
);

const ProductSliders = () => {
  const [attributes, setAttributes] = useState({
    texture: 0,
    renders: 0,
    configurator: 0,
    video: 0,
  });

  const [isActive, setIsActive] = useState({
    texture: true,
    configurator: false,
    video: false,
    renders: true,
  });
  const [newProductsActive, setNewProductsActive] = useState({
    silhouettes: false,
    vignettes: false,
    "Augmented Reality": false,
    "Lifestyle Imagery": false,
  });

  const [totalCost, setTotalCost] = useState(0);

  const handleChange = (attribute, value) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: value,
    }));
  };

  const handleToggle = (attribute, checked) => {
    setIsActive((prevIsActive) => ({
      ...prevIsActive,
      [attribute]: checked,
    }));
  };
  const handleNewProductToggle = (product, checked) => {
    setNewProductsActive((prevProductsActive) => ({
      ...prevProductsActive,
      [product]: checked,
    }));
  };

  const calculateTotalCost = () => {
    const cost = Object.entries(attributes).reduce(
      (total, [attribute, quantity]) => {
        const isActiveAttr = isActive[attribute];
        if (isActiveAttr) {
          const costPerItem = attributeCosts[attribute] || 0;
          return total + quantity * costPerItem;
        }
        return total;
      },
      0
    );
    const newProductsCost = Object.entries(newProductsActive).reduce(
      (total, [product, active]) => {
        if (active) {
          const costPerProduct = newProductCosts[product] || 0;
          total += costPerProduct;
        }
        return total;
      },
      0
    );
    setTotalCost(cost + newProductsCost);
  };

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", margin: "4% 30%" }}
      >
        <div style={{ fontSize: "60px", padding: "0px" }}>Build Your Plan</div>
        <p>
          Dive into a personalized 3D adventure of creativity & custom
          solutions.{" "}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          <div>For All</div>
          <div
            onClick={calculateTotalCost}
            style={{
              display: "flex",
              borderRadius: "20px",
              color: "white",
              padding: "10px",
              border: "1px solid orange",
              fontSize: "14px",
              background: "linear-gradient(180deg, #F46A34 40%, #CA4613 100%)",
            }}
          >
            Marketing
          </div>
          <div>Sales</div>
          <div>NPD</div>
          <div>Photography</div>
          E-Commerce
        </div>
      </div>

      <div style={{ margin: "2% 25%" }}>
        <div
          title="Product Attributes"
          style={{
            borderRadius: "30px",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            padding: "2%",
            border: "1.5px solid orange",
          }}
        >
          {Object.keys(attributes).map((attribute, i) => (
            <div key={attribute}>
              <SliderInput
                label={`${
                  attribute.charAt(0).toUpperCase() + attribute.slice(1)
                } `}
                value={attributes[attribute]}
                onChange={(value) => handleChange(attribute, value)}
                showSwitch={
                  attribute === "configurator" || attribute === "video"
                }
                switchChecked={isActive[attribute]}
                onSwitchChange={(checked) => handleToggle(attribute, checked)}
                unlimited={i > 1}
              />
            </div>
          ))}

          <div
            style={{
              marginBottom: 16,
              display: "flex",
              gap: "0px",
              flexWrap: "wrap",
            }}
          >
            {Object.keys(newProductsActive).map((product) => (
              <div
                key={product}
                style={{
                  margin: "20px",
                  width: "400px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: "500", fontSize: "24px" }}>
                  {product.charAt(0).toUpperCase() + product.slice(1)}
                </div>
                <Switch
                  checked={newProductsActive[product]}
                  onChange={(checked) =>
                    handleNewProductToggle(product, checked)
                  }
                  handleBg="red"
                />
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              alignItems: "center",
            }}
          >
            <button
              onClick={calculateTotalCost}
              style={{
                cursor: "pointer",
                display: "flex",
                borderRadius: "20px",
                color: "white",
                padding: "10px",
                border: "1px solid orange",
                fontSize: "18px",
                margin: "auto",
                background:
                  "linear-gradient(180deg, #F46A34 40%, #CA4613 100%)",
              }}
            >
              Calculate
            </button>
            <Title level={2} style={{ margin: "auto", fontSize: "36px" }}>
              ${totalCost}/mo
            </Title>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSliders;
