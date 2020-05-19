let label = null;

const LeyoutConfig = {
  layout: {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  },

  validateMessages: {
    required: `${label} jest wymagany!`,
    types: {
      // email: `${getValueFromEvent} is not validate email!`,
      number: `${label} is not a validate number!`,
    },
    number: {
      // range: `${label} must be between ${min} and ${max}`,
    },
  },
  tailFormItemLayout: {
    wrapperCol: {
      xs: {
        span: 0,
        offset: 0,
      },
      sm: {
        span: 0,
        offset: 0,
      },
    },
  },
};

export default LeyoutConfig;
