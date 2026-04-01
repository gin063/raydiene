<template>
    <div class="min-h-screen bg-[#050505] text-white font-body">
        <TheHeader />
        <BreadcrumbBar />
        <main>
            <slot />
        </main>
        <TheFooter />
    </div>
</template>