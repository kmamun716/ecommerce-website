import React from 'react'

type Props = {}

const AddProduct = (props: Props) => {
  return (
    <div>
      <h1>Add New Product</h1>
      <form action="">
        <div className="flex justify-evenly gap-4">
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Title</legend>
              <input type="text" className="input" placeholder="Product Title" required />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Price</legend>
              <input type="number" className="input" placeholder="Product Price" required />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Color</legend>
              <input type="text" className="input" placeholder="Product Color" />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Product Photo</legend>
              <input type="file" className="file-input" />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Select Category</legend>
              <select defaultValue="Pick a browser" className="select">
                <option disabled={true}>Pick a Category</option>
                <option>Chrome</option>
                <option>FireFox</option>
                <option>Safari</option>
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Stock</legend>
              <input type="number" className="input" placeholder="Product Stock" />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Size</legend>
              <input type="text" className="input" placeholder="Product Size" />
            </fieldset>
          </div>
        </div><fieldset className="fieldset">
          <legend className="fieldset-legend">Description</legend>
          <textarea className="textarea h-24" placeholder="Product Description"></textarea>
        </fieldset>
        <button type="submit" className="btn btn-primary mt-4">Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct