import { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import Button from '../Shared/Button/Button';
import { imageUpload } from '../../API/utils';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddBlogForm = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = e => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const thumbnail = await imageUpload(image);

    const extractPlainText = htmlString => {
      const tempElement = document.createElement('div');
      tempElement.innerHTML = htmlString;
      return tempElement.textContent || tempElement.innerText || '';
    };

    const blogDec = extractPlainText(content);

    const fromData = {
      title,
      thumbnail,
      blogDec,
      status: 'draft',
    };
    console.log(fromData);

    // save data in data base
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/add-blog`,
      fromData
    );
    if (data.insertedId) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
      });

      // resat
      form.reset();
      setContent('');
      setImage(null);
    }
  };

  return (
    <div className=" flex justify-center py-5 text-gray-800 bg-gray-50 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-6 rounded-lg shadow space-y-6"
      >
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-gray-700 font-semibold">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter blog title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-lime-500"
            required
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">
            Thumbnail Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-lime-500 file:text-white hover:file:bg-lime-600"
            required
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="h-40 object-cover rounded"
            />
          )}
        </div>

        {/* Content (Jodit Editor) */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={newContent => setContent(newContent)}
          />
        </div>

        {/* Submit Button */}

        <Button type="submit" label={'Show in Console'}></Button>
      </form>
    </div>
  );
};

export default AddBlogForm;
