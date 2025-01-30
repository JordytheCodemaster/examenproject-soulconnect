export default function Modal({ isOpen, onClose }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white w-11/12 max-w-lg max-h-[80vh] rounded-lg shadow-lg overflow-y-auto">
          <header className="bg-purple-500 text-white px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Profiel Aanmaken</h2>
            <button
              onClick={onClose}
              className="text-white text-2xl hover:text-gray-200"
            >
              &times;
            </button>
          </header>
          <div className="p-6 space-y-4">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Gebruikersnaam</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Voer uw gebruikersnaam in"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Geboortedatum</label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Postcode</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Uw postcode"
                />
              </div>
              {/* Add additional profile creation fields here */}
              <button
                type="submit"
                className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition"
              >
                Profiel Opslaan
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  