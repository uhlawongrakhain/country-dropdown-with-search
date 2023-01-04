import Dropdown from './Dropdown';
import InputComponent from './InputComponent';
import districts from '../data/districts.json';
import divisions from '../data/divisions.json';
import upazillas from '../data/upazillas.json';
import countries from '../data/countries.json';

const Form = ({ formData, setFormData }) => {
  const saveFormData = (input) => {
    setFormData((prev) => ({ ...prev, ...input }));
  };

  return (
    <form>
      <InputComponent
        className='form-input'
        type='text'
        placeholder='Enter person/site name'
        onChange={(e) => saveFormData({ name: e.target.value })}
        value={formData.name ?? ''}
      />
      <Dropdown
        label='Country'
        list={countries.countries}
        onChange={(id) => saveFormData({ country: id })}
        value={formData.country}
      />
      <Dropdown
        label='Devision/Province/State'
        list={formData.country === '1' ? divisions.divisions : []}
        onChange={(id) => saveFormData({ division: id })}
        value={formData.division}
        disabled={!formData.country}
      />
      <Dropdown
        label='District'
        list={districts.districts.filter(
          (item) => item.division_id === formData.division
        )}
        onChange={(id) => saveFormData({ district: id })}
        value={formData.district}
        disabled={!formData.division}
      />
      <Dropdown
        label='City/Sub District/Thana'
        list={upazillas.upazilas.filter(
          (item) => item.district_id === formData.district
        )}
        onChange={(id) => saveFormData({ upazilla: id })}
        value={formData.upazilla}
        disabled={!formData.district}
      />
      <Dropdown
        label='Union/Area/Town'
        list={[]}
        disabled={!formData.upazilla}
      />
      <Dropdown label='Zipcode' list={[]} disabled />
      <Dropdown label='Streat Address/Village' list={[]} disabled />
      <InputComponent
        label='House/suite/apartment no'
        className='form-input'
        type='number'
        placeholder='Enter person/site name'
        onChange={(e) => saveFormData({ house: e.target.value })}
        value={formData.house ?? ''}
      />
      <InputComponent
        label='Phone'
        className='form-input'
        type='tel'
        placeholder='Enter person/site name'
        onChange={(e) => saveFormData({ phone: e.target.value })}
        value={formData.phone ?? ''}
      />
      <InputComponent
        label='Fax'
        className='form-input'
        type='number'
        placeholder='Enter person/site name'
        onChange={(e) => saveFormData({ fax: e.target.value })}
        value={formData.fax ?? ''}
      />
    </form>
  );
};

export default Form;
