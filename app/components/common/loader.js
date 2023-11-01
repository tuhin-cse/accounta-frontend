

const MainLoader = () => {
    return (
        <div
            style={{zIndex: 99999}}
            className="fixed left-0 w-full top-0 h-screen flex justify-center items-center bg-gray-500 bg-opacity-25" id="main-loader">
            <Loader/>
        </div>
    )
}

export const showLoader = () => document.getElementById('main-loader').classList.remove('hidden')
export const hideLoader = () => document.getElementById('main-loader').classList.add('hidden')


export default MainLoader

export const Loader = () => {
    return (
        <div
            className="inline-block text-primary-700 h-16  w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
              <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              />
        </div>
    )
}