import { Form, Head, usePage } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { __ } from '@/lib/helpers';
import { edit } from '@/routes/profile';
import type { Auth } from '@/types';

export default function Profile({
    status,
}: {
    status?: string;
}) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const user = auth.user!;

    return (
        <>
            <Head title={__('Profile settings')} />

            <h1 className="sr-only">{__('Profile settings')}</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title={__('Profile information')}
                    description={__('Update your username and profile details')}
                />

                <Form
                    {...ProfileController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="username">{__('Username')}</Label>

                                <Input
                                    id="username"
                                    className="mt-1 block w-full"
                                        defaultValue={user.username}
                                    name="username"
                                    required
                                    autoComplete="username"
                                    placeholder={__('Username')}
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.username}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">{__('Email address')}</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                        defaultValue={user.email}
                                    name="email"
                                    required
                                    autoComplete="username"
                                    placeholder={__('Email address')}
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phone_number">{__('Phone number')}</Label>

                                <Input
                                    id="phone_number"
                                    type="text"
                                    className="mt-1 block w-full"
                                        defaultValue={user.phone_number ?? ''}
                                    name="phone_number"
                                    autoComplete="tel"
                                    placeholder={__('Phone number')}
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.phone_number}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="profile_image">{__('Profile image URL')}</Label>

                                <Input
                                    id="profile_image"
                                    type="url"
                                    className="mt-1 block w-full"
                                        defaultValue={user.profile_image ?? ''}
                                    name="profile_image"
                                    placeholder={__('Profile image URL')}
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.profile_image}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="bio">{__('Bio')}</Label>

                                <textarea
                                    id="bio"
                                    className="mt-1 min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                        defaultValue={user.bio ?? ''}
                                    name="bio"
                                    placeholder={__('Tell us a little about yourself')}
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.bio}
                                />
                            </div>

                            {status === 'profile-updated' && (
                                <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                    {__('Profile updated successfully.')}
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing}
                                    data-test="update-profile-button"
                                >
                                    {__('Save')}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>

            <DeleteUser />
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: __('Profile settings'),
            href: edit(),
        },
    ],
};
