export const validateCash = cash => {
  const errors = {
    small: "Amount too small",
    invalid: "Entered value is invalid",
    required: "Amount is required",
  };

  if (!cash) return { error: errors.required };
  else if (isNaN(cash)) return { error: errors.invalid };
  else if (+cash < 1) return { error: errors.small };
  else return true;
};

export const attemtPayment = async (id, amount) => {
  try{
    const resp = await fetch('/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token_id: id,
        amount: amount * 100
      })
    })
    const {success, data} = await resp.json();
    if(!success) return {error: data.message, detail: data.detail};
    return {};
  }catch(err){
    return {error: "Failed to make request"}
  }

};

export const saveHandle = async handle => {
  try{
    const resp = await fetch('/handle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({handle})
    })
    const {success, data} = await resp.json();
    if(!success) return {error: data.message, detail: data.detail};
    return {};
  }catch(err){
    return {error: "Failed to make request"}
  }
};
