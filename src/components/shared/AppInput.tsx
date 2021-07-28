import * as React from 'react'

type AppInputProps = {
  inputId: string,
  inputType: string,
  inputClass: string,
  inputPlaceholder: string,
  inputValue: string
}
type AppInputState = {
}
class AppInput extends React.Component<AppInputProps, AppInputState> {

  render() {
    return (
      <input type={this.props.inputType} placeholder={this.props.inputPlaceholder} value={this.props.inputValue} id={this.props.inputId} className={this.props.inputClass}/>
    );
  }
}

export default AppInput
