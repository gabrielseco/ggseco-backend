const Validators = () => {
  const types = {
    STRING: "STRING",
  }

  const getTypeDefaultValue = (type) => {
    const EMPTY_STRING = "";
    switch (type) {
      case types.STRING:
        return EMPTY_STRING;
    }
  } 

  const isRequired = (value, type) => {
    const typeDefaultValue = getTypeDefaultValue(type); 
    return value !== undefined && value !== null && value !== typeDefaultValue;
  }

  return {
    types,
    isRequired,
  }
}

export default Validators;
