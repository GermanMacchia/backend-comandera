import { SetMetadata, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

export const CACHED_KEY = 'Cached';
export const PUBLIC_KEY = 'Public';

export function Cached(): any {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		SetMetadata(CACHED_KEY, true)(target, propertyKey, descriptor);
		UseInterceptors(CacheInterceptor)(target, propertyKey, descriptor);
	};
}

export const Public = () => SetMetadata(PUBLIC_KEY, true);

export function CachedAndPublic(): any {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		SetMetadata(CACHED_KEY, true)(target, propertyKey, descriptor);
		SetMetadata(PUBLIC_KEY, true)(target, propertyKey, descriptor);
		UseInterceptors(CacheInterceptor)(target, propertyKey, descriptor);
	};
}
