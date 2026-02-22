import { LuFilterX } from "react-icons/lu";

export default function FilterComponent({
  name,
  setName,
  dateInput,
  setDateInput,
  setDay,
  time,
  setTime,
  handleResetFilter
} : {
  name: string,
  setName: (value: string) => void,
  dateInput: string,
  setDateInput: (value: string) => void,
  setDay: (value: number | null) => void,
  time: string,
  setTime: (value: string) => void,
  handleResetFilter: () => void
}) {
  return (
    <div className="grid md:grid-cols-[1fr_1fr_1fr_auto] gap-2 mb-6">
      <input
        placeholder="Search name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 rounded-md bg-gray-100 focus:bg-white"
      />
      <input
        type="date"
        className="p-2 rounded-md bg-gray-100 focus:bg-white"
        value={dateInput}
        onChange={(e) => {
          const value = e.target.value;
          setDateInput(value);
          if (!value) {
            setDay(null);
          }
          setDay(new Date(value).getDay());
        }}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="p-2 rounded-md bg-gray-100 focus:bg-white"
      />
      <button
        onClick={handleResetFilter}
        className="bg-teal-600 hover:bg-teal-500 transition text-white rounded-md p-2 cursor-pointer w-full md:w-10 h-full md:h-10 flex justify-center items-center"
      >
        <LuFilterX className="w-5 h-5"/>
      </button>
    </div>
  )
}