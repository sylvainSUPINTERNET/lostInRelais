
import { Button, Description, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'

export default function DownloadInput() {
    return (
        <div className='text-black'>
            <Field>
                {/* <Label className="text-xl font-medium">Name</Label> */}
                <Description className="text-md/6 text-black/50">Provide youtube video link</Description>
                <Input
                placeholder='https://www.youtube.com/watch?v=_Bsl1c1x3wQ'
                className={clsx(
                    'mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-md/6 text-black',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                )}
                />
            </Field>
            <div className="p-1 mt-2 flex justify-end">
                <Button className="px-4 py-2 bg-zinc-600 text-white rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out">
                    Download
                </Button>
            </div>
        </div>
    )
}