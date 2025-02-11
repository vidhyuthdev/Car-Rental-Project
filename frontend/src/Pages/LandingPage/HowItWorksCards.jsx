const Cards = ({id,heading,desc}) => {
  return (
    <div className='bg-white rounded-3xl flex  flex-col items-center px-2 py-4  max-w-[320px]'>
      <div className="flex items-center gap-2 w-full">
          <div className="bg-custom-dark rounded-full px-3 py-2 text-custom-lightblue">
              {id}
          </div>
          <div className="text-custom-dark font-bold">{heading}</div>
      </div>
      <div className='mt-4 text-sm'>
          {desc}
      </div>
  </div>
  )
}

export default Cards
