import { render, fireEvent } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Checkbox, { CheckboxProps } from "./index";

const LABEL = "label";
const IS_CHECKED = false;

const checkboxProps: CheckboxProps = {
  label: LABEL,
  isChecked: IS_CHECKED,
};

describe("<Checkbox />", () => {
  it("should render component in document", () => {
    const { container } = render(<Checkbox {...checkboxProps} />);
    expect(container).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { checked: IS_CHECKED })
    ).toBeInTheDocument();

    // label 체크
    const label = screen.queryByText(LABEL);
    expect(label).toBeInTheDocument();

    // 클릭하면 false -> true || true -> false
    fireEvent.click(screen.queryByRole("button"));
    expect(screen.getByRole("checkbox", { checked: true })).toBeInTheDocument();
  });
});
