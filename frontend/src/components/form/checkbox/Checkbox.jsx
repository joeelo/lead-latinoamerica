import styled, { keyframes } from 'styled-components';

const Checkbox = ({ option, register }) => {
  if (!option?.value) return <></>;
  return (
    <Container>
      <Label>
        <Input
          name={option.value}
          value={option.value}
          type="checkbox"
          {...register(option.value)}
        />
        {option.label}
      </Label>
    </Container>
  );
};

export default Checkbox;

const jelly = keyframes`
	from {
		transform: scale(1, 1);
	}
	30% {
		transform: scale(1.25, 0.75);
	}
	40% {
		transform: scale(0.75, 1.25);
	}
	50% {
		transform: scale(1.15, 0.85);
	}
	65% {
		transform: scale(0.95, 1.05);
	}
	75% {
		transform: scale(1.05, 0.95);
	}
	to {
		transform: scale(1, 1);
	}
`;

const Container = styled.div`
  display: flex;
`;

const Label = styled.label`
  font-size: 26px;

  :hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  margin-right: 20px;

  .cbx:checked ~ .cbx {
    border-color: transparent;
    background: #6871f1;
    animation: jelly 0.6s ease;
  }
  .cbx:checked ~ .cbx:after {
    opacity: 1;
    transform: rotate(45deg) scale(1);
  }
`;
