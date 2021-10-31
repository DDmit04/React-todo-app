import {registerLocale, setDefaultLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';

export const SetupDatepicker = () => {
    registerLocale('ru', ru)
    setDefaultLocale('ru')
}
