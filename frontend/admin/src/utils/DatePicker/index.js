import DateTimePicker from "@mui/lab/DateTimePicker";
import { TextField } from "@mui/material";
import { format } from "date-fns";

function DatePickerField({
    form,
    field: { value, name },
    maxDate = new Date("2099-12-31"),
    minDateTime = new Date(),
    formErrors,
    formErrors2,
    ...others
  }) {
    const currentError = (form.errors[name]) || (formErrors[formErrors2.indexOf(name)]?.msg);
    const toShowError = Boolean( (currentError && form.touched[name]) || formErrors2.indexOf(name) !== -1 );
  
    return (
      <DateTimePicker
        maxDate={maxDate}
        minDateTime={minDateTime}
        value={value}
        onError={(reason, value) => {
          switch (reason) {
            case "invalidDate":
              form.setFieldError(name, "Invalid date format");
              break;
  
            case "disablePast":
              form.setFieldError(name, "Values in the past are not allowed");
              break;
  
            case "maxDate":
              form.setFieldError(name, `Date should not be after ${format(maxDate, "P")}`);
              break;
  
            case "minDateTime":
              form.setFieldError(name, `Date and Time should not be before ${format(minDateTime, "P")}`);
              break;
  
            default:
              form.setErrors({
                ...form.errors,
                [name]: undefined,
              });
          }
        }}
        // Make sure that your 3d param is set to `false` on order to not clear errors
        onChange={(date) => form.setFieldValue(name, date, false)}
        renderInput={(props) => (
          <TextField
            {...props}
            margin="normal"
            fullWidth
            name={name}
            error={toShowError}
            helperText={toShowError ? currentError ?? props.helperText : undefined}
            // Make sure that your 3d param is set to `false` in order to not clear errors
            onBlur={() => form.setFieldTouched(name, true, false)}
          />
        )}
        {...others}
      />
    );
  }

  export {DatePickerField};