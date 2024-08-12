import "./AddDataForm.css";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { backend_url } from "../../constants";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    backgroundColor: "white",
  },
}));

export default function AddData({ type }) {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [dateTime, setDateTime] = useState("2021-06-06T10:30");

  const onSubmit = (data) => {
    fetch(`${backend_url}/addData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        date: new Date(dateTime).toISOString(),
        type: type,
        amount: parseFloat(data.amount),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res._id) {
          alert("User data added successfully");
        }
      });
    //   async function getMonthData(){
    //     fetch("http://localhost:5080/monthReport", {
    //       method: "GET",
    //     })
    //     .then((res) => res.json())
    //     .then((res) => {
    //         setMonthData(res);
    //     });
    // }
    // console.log(data);
    // console.log(dateTime);
    // console.log(new Date(dateTime).toISOString())
  };
  const classes = useStyles();
  return (
    <Container>
      <div className="MyForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>{type}</h1>
          <hr />
          <Controller
            setDateTime={setDateTime}
            control={control}
            name="date"
            render={({ onChange, value }) => (
              <TextField
                selected={value}
                onChange={(event) => {
                  setDateTime(event.target.value);
                }}
                id="datetime-local"
                label="Choose Date and Time"
                type="datetime-local"
                defaultValue="2021-06-06T10:30"
                // defaultValue={Date.now()}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />

          <br />
          <br />
          <Select
            label="category"
            register={register}
            options={
              type == "Income"
                ? ["Salary", "Personal", "Business", "Agriculture", "Others"]
                : ["fuel", "movie", "food", "loan", "medical", "others"]
            }
          />
          <Select
            label="division"
            register={register}
            options={["Office", "Personal"]}
          />
          <br />
          <CustomNameInput
            label="description"
            register={register}
            errors={errors}
          />
          <CustomNumberInput
            label="amount"
            register={register}
            errors={errors}
          />

          <input type="submit" />
        </form>
      </div>
    </Container>
  );
}

function CustomNameInput({ label, register, errors }) {
  return (
    <>
      <label>{label}</label>
      <input
        placeholder={label}
        {...register(label, {
          required: true,
          minLength: 3,
        })}
      />
      {errors[label] && errors[label].type === "required" && (
        <p style={{ color: "red" }}>This input is required</p>
      )}

      {errors[label] && errors[label].type === "minLength" && (
        <p style={{ color: "red" }}>Min Length should be 3</p>
      )}
    </>
  );
}

function CustomNumberInput({ label, register, errors }) {
  return (
    <>
      <label>{label}</label>
      <input
        placeholder={label}
        name={label}
        {...register(label, {
          required: true,
          minLength: 2,
          pattern: /\d+/,
        })}
      />
      {errors[label] && errors[label].type === "required" && (
        <p style={{ color: "red" }}>Enter you mobile number</p>
      )}
      {errors[label] && errors[label].type === "minLength" && (
        <p style={{ color: "red" }}>
          This input should contain min 2 characters
        </p>
      )}
      {errors[label] && errors[label].type === "pattern" && (
        <p style={{ color: "red" }}>This input is number only.</p>
      )}
    </>
  );
}

function Select({ register, options, label, ...rest }) {
  return (
    <>
      <label>{label}</label>&ensp;
      <select {...register(label)} {...rest}>
        {options.map((value) => (
          <option value={value}>{value}</option>
        ))}
      </select>
      &ensp;&ensp;
    </>
  );
}
