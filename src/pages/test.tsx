// App.tsx
import React, { useState } from "react";
import "./App.css";

const App = () => {
  // The selected drink
  const [selectedDrink, setSelectedDrink] = useState<String>();

  // This function will be triggered when a radio button is selected
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDrink(event.target.value);
  };

  return (
    <div className="container">
      <h3>KindaCode.com</h3>
      <fieldset>
        <legend>Please select your most favorite drink?</legend>
        <p>
          <input
            type="radio"
            name="drink"
            value="Coffee"
            id="coffee"
            onChange={radioHandler}
          />
          <label htmlFor="coffee">Coffee</label>
        </p>

        <p>
          <input
            type="radio"
            name="drink"
            value="Tea"
            id="tea"
            onChange={radioHandler}
          />
          <label htmlFor="tea">Green Tea</label>
        </p>

        <p>
          <input
            type="radio"
            name="drink"
            value="Pumpkin Juice"
            id="pumpkin"
            onChange={radioHandler}
          />
          <label htmlFor="pumpkin">Pumpkin Juice</label>
        </p>
      </fieldset>

      {/* Display the selected drink */}
      {selectedDrink && <h2>{selectedDrink}</h2>}
    </div>
  );
};

export default App;