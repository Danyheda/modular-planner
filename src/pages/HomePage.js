import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div
                style={{
                    background: "#e19a9a",
                    width: "200px",
                    borderRadius: "30px",
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <button
                    style={buttonStyle}
                    onClick={() => alert("Planning not implemented yet")}
                >
                    Planning
                </button>
                <button style={buttonStyle} onClick={() => navigate("/design")}>
                    Design
                </button>
            </div>
        </div>
    );
};

const buttonStyle = {
    padding: "15px 30px",
    borderRadius: "25px",
    border: "none",
    background: "white",
    fontWeight: "bold",
    cursor: "pointer",
};

export default HomePage;
