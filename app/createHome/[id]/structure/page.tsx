import { createCategoryPage } from '@/app/action'
import CreateHomeFooter from '@/components/my_components/CreateHomeFooter'
import SelectCategory from '@/components/my_components/selectCategory'

function StructureRoute({params}: {params: {id: string}}) {
    return (
        <>
            <div className='w-[50%] mx-auto'>
                <h2 className='text-3xl font-semibold tracking-tight transition-colors'>Which of these categories describe your home the best?</h2>
            </div>

            <form action={createCategoryPage}>
                <input type="hidden" name="homeId" value={params.id} />
                <SelectCategory />
                <CreateHomeFooter />
            </form>
        </>
    )
} export default StructureRoute
